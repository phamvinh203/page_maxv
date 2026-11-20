import { CommentForm, CommentList } from "@/app/tin-tuc/_components/comment-form";
import { listPostComments, type PublicPost } from "@/app/_lib/newsApi";

/** Khối bình luận dưới bài (REQ-045): trang đầu render sẵn (cache), "Xem thêm" tải tiếp trên trình duyệt; bài tắt bình luận thì ẩn form. */
export async function CommentSection({ post }: { post: PublicPost }) {
  const data = await listPostComments(post.slug, 1).catch(() => undefined);

  return (
    <section aria-labelledby="comments-heading" className="mt-10 border-t pt-8">
      <h2 id="comments-heading" className="text-lg font-bold text-foreground">Bình luận ({data?.commentCount ?? post.commentCount})</h2>

      {data === undefined ? (
        <p role="alert" className="mt-4 text-sm text-muted-foreground">Không tải được bình luận. Vui lòng thử lại sau.</p>
      ) : (
        data && (
          <CommentList
            slug={post.slug}
            allowReply={post.allowComments}
            initial={data.items}
            hasMore={data.total > data.pageSize}
          />
        )
      )}

      {post.allowComments && (
        <div className="mt-8">
          <h3 className="text-sm font-semibold text-foreground">Để lại bình luận</h3>
          <CommentForm slug={post.slug} />
        </div>
      )}
    </section>
  );
}
