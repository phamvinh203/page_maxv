-- Phần schema.prisma không khai báo được. Dán vào cuối migration tương ứng (prisma migrate dev --create-only).


-- 01 đăng nhập admin
ALTER TABLE admin_roles
  ADD CONSTRAINT admin_roles_name_check CHECK (length(name) BETWEEN 1 AND 100),
  ADD CONSTRAINT admin_roles_description_check CHECK (length(description) <= 300);
ALTER TABLE admin_users
  ADD CONSTRAINT admin_users_email_check CHECK (email = lower(email) AND length(email) <= 254),
  ADD CONSTRAINT admin_users_display_name_check CHECK (length(display_name) BETWEEN 1 AND 100),
  ADD CONSTRAINT admin_users_status_check CHECK (status IN ('invited','active','disabled')),
  ADD CONSTRAINT admin_users_password_check CHECK (status = 'invited' OR password_hash IS NOT NULL);
ALTER TABLE admin_tokens
  ADD CONSTRAINT admin_tokens_scope_check CHECK (scope IN ('activation','password_reset'));
ALTER TABLE audit_logs
  ADD CONSTRAINT audit_logs_result_check CHECK (result IN ('success','failure'));

-- 02 phân quyền
ALTER TABLE admin_role_permissions
  ADD CONSTRAINT admin_role_permissions_permission_check CHECK (permission IN (
    'posts.view','posts.edit','posts.publish','posts.delete',
    'media.view','media.upload','media.delete',
    'pricing.view','pricing.edit',
    'leads.view','leads.update','leads.export',
    'users.view','users.manage','audit.view'));

-- 03 ảnh + bài viết
CREATE OR REPLACE FUNCTION f_unaccent(text) RETURNS text
  LANGUAGE sql IMMUTABLE PARALLEL SAFE STRICT
  AS $$ SELECT public.unaccent('public.unaccent', $1) $$;
ALTER TABLE media
  ADD CONSTRAINT media_original_name_check CHECK (length(original_name) <= 255),
  ADD CONSTRAINT media_mime_type_check CHECK (mime_type IN ('image/webp','image/jpeg','image/png')),
  ADD CONSTRAINT media_size_bytes_check CHECK (size_bytes > 0),
  ADD CONSTRAINT media_width_check CHECK (width BETWEEN 1 AND 4096),
  ADD CONSTRAINT media_height_check CHECK (height BETWEEN 1 AND 4096),
  ADD CONSTRAINT media_alt_check CHECK (length(alt) BETWEEN 1 AND 250),
  ADD CONSTRAINT media_status_check CHECK (status IN ('ready','deleting'));
ALTER TABLE media_usages
  ADD CONSTRAINT media_usages_resource_type_check CHECK (resource_type IN ('post')),
  ADD CONSTRAINT media_usages_field_check CHECK (field IN ('cover','content'));
ALTER TABLE posts
  ADD CONSTRAINT posts_slug_check CHECK (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$' AND length(slug) <= 160),
  ADD CONSTRAINT posts_title_check CHECK (length(title) BETWEEN 1 AND 200),
  ADD CONSTRAINT posts_excerpt_check CHECK (length(excerpt) <= 500),
  ADD CONSTRAINT posts_content_check CHECK (jsonb_typeof(content) = 'array'),
  ADD CONSTRAINT posts_state_check CHECK (state IN ('draft','published','archived')),
  ADD CONSTRAINT posts_published_at_check CHECK (state <> 'published' OR published_at IS NOT NULL),
  ADD CONSTRAINT posts_seo_title_check CHECK (length(seo_title) <= 70),
  ADD CONSTRAINT posts_seo_description_check CHECK (length(seo_description) <= 170);

-- 04 lead
ALTER TABLE leads
  ADD CONSTRAINT leads_type_check CHECK (type IN ('contact','consult')),
  ADD CONSTRAINT leads_topic_check CHECK (topic IN ('tu-van','ho-tro','hop-tac')),
  ADD CONSTRAINT leads_name_check CHECK (length(name) BETWEEN 1 AND 100),
  ADD CONSTRAINT leads_phone_check CHECK (phone ~ '^\+?[0-9]{8,20}$'),
  ADD CONSTRAINT leads_email_check CHECK (email = lower(email) AND length(email) <= 254),
  ADD CONSTRAINT leads_company_check CHECK (length(company) <= 200),
  ADD CONSTRAINT leads_product_key_check CHECK (product_key IN ('maxv-accounting','maxv-hddt','maxv-hkd','chu-ky-so','hoa-don-dien-tu')),
  ADD CONSTRAINT leads_industry_check CHECK (industry IN ('ban-le','thuong-mai','dich-vu','san-xuat-nho','khac')),
  ADD CONSTRAINT leads_message_check CHECK (length(message) <= 5000),
  ADD CONSTRAINT leads_source_path_check CHECK (source_path LIKE '/%' AND length(source_path) <= 300),
  ADD CONSTRAINT leads_status_check CHECK (status IN ('new','contacted','qualified','closed','spam')),
  ADD CONSTRAINT leads_type_topic_check CHECK (
    (type = 'contact' AND topic IS NOT NULL) OR
    (type = 'consult' AND topic IS NULL AND product_key IS NOT NULL));
ALTER TABLE lead_notes
  ADD CONSTRAINT lead_notes_body_check CHECK (length(body) BETWEEN 1 AND 2000);

-- 05 giá cả
ALTER TABLE pricing_products
  ADD CONSTRAINT pricing_products_key_check CHECK (key IN ('maxv-accounting','maxv-hddt','maxv-hkd','chu-ky-so','hoa-don-dien-tu')),
  ADD CONSTRAINT pricing_products_title_check CHECK (length(title) <= 200),
  ADD CONSTRAINT pricing_products_description_check CHECK (length(description) <= 500),
  ADD CONSTRAINT pricing_products_notes_check CHECK (jsonb_typeof(notes) = 'array' AND jsonb_array_length(notes) <= 5);
ALTER TABLE pricing_plans
  ADD CONSTRAINT pricing_plans_name_check CHECK (length(name) BETWEEN 1 AND 100),
  ADD CONSTRAINT pricing_plans_description_check CHECK (length(description) <= 300),
  ADD CONSTRAINT pricing_plans_price_mode_check CHECK (price_mode IN ('fixed','from','free','contact')),
  ADD CONSTRAINT pricing_plans_billing_period_check CHECK (billing_period IN ('month','year','once','none')),
  ADD CONSTRAINT pricing_plans_specs_check CHECK (jsonb_typeof(specs) = 'array' AND jsonb_array_length(specs) <= 8),
  ADD CONSTRAINT pricing_plans_features_check CHECK (jsonb_typeof(features) = 'array' AND jsonb_array_length(features) <= 20),
  ADD CONSTRAINT pricing_plans_cta_label_check CHECK (length(cta_label) <= 100),
  ADD CONSTRAINT pricing_plans_cta_href_check CHECK (cta_href ~ '^(/|#|https://)' AND cta_href !~* '^javascript:'),
  ADD CONSTRAINT pricing_plans_price_check CHECK (
    (price_mode = 'contact' AND price_amount IS NULL) OR
    (price_mode = 'free'    AND price_amount = 0) OR
    (price_mode IN ('fixed','from') AND price_amount > 0 AND price_amount <= 1000000000000));
