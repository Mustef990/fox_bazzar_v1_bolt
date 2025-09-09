/*
  # Add sample data

  1. Sample Products
    - Electronics, fashion, home products
    - Various price ranges and categories
  
  2. Sample Merchants
    - Different merchant profiles for testing
*/

-- Insert sample merchant profiles (these would normally be created through registration)
INSERT INTO profiles (id, role, name, phone, address) VALUES
  ('11111111-1111-1111-1111-111111111111', 'merchant', 'متجر الإلكترونيات', '+963 123 456 789', 'دمشق، سوريا'),
  ('22222222-2222-2222-2222-222222222222', 'merchant', 'متجر الأزياء', '+963 987 654 321', 'حلب، سوريا'),
  ('33333333-3333-3333-3333-333333333333', 'merchant', 'متجر المنزل', '+963 555 123 456', 'حمص، سوريا')
ON CONFLICT (id) DO NOTHING;

-- Insert sample products
INSERT INTO products (merchant_id, name, description, price, original_price, category, stock, sku, image_url) VALUES
  ('11111111-1111-1111-1111-111111111111', 'هاتف ذكي متطور', 'هاتف ذكي بمواصفات عالية وكاميرا متقدمة', 599.00, 699.00, 'إلكترونيات', 25, 'PHONE001', 'https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg?auto=compress&cs=tinysrgb&w=300'),
  ('11111111-1111-1111-1111-111111111111', 'لابتوب عالي الأداء', 'لابتوب للألعاب والعمل المهني', 1299.00, 1499.00, 'إلكترونيات', 12, 'LAPTOP001', 'https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=300'),
  ('11111111-1111-1111-1111-111111111111', 'ساعة ذكية رياضية', 'ساعة ذكية لتتبع اللياقة البدنية', 299.00, 399.00, 'رياضة', 30, 'WATCH001', 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=300'),
  ('11111111-1111-1111-1111-111111111111', 'سماعات لاسلكية', 'سماعات عالية الجودة مع إلغاء الضوضاء', 199.00, 249.00, 'إلكترونيات', 45, 'HEADPHONES001', 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=300'),
  ('22222222-2222-2222-2222-222222222222', 'قميص قطني أنيق', 'قميص قطني عالي الجودة للرجال', 45.00, 60.00, 'أزياء', 50, 'SHIRT001', 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=300'),
  ('22222222-2222-2222-2222-222222222222', 'فستان صيفي أنيق', 'فستان صيفي مريح وأنيق للنساء', 75.00, 95.00, 'أزياء', 35, 'DRESS001', 'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=300'),
  ('33333333-3333-3333-3333-333333333333', 'طقم أواني المطبخ', 'طقم أواني طبخ من الستانلس ستيل', 120.00, 150.00, 'منزل وحديقة', 20, 'COOKWARE001', 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=300'),
  ('33333333-3333-3333-3333-333333333333', 'مصباح LED ذكي', 'مصباح LED قابل للتحكم عبر التطبيق', 35.00, 45.00, 'منزل وحديقة', 60, 'LAMP001', 'https://images.pexels.com/photos/1112598/pexels-photo-1112598.jpeg?auto=compress&cs=tinysrgb&w=300')
ON CONFLICT (sku) DO NOTHING;

-- Update product ratings and reviews
UPDATE products SET 
  rating = 4.8,
  reviews_count = 124
WHERE sku = 'PHONE001';

UPDATE products SET 
  rating = 4.9,
  reviews_count = 89
WHERE sku = 'LAPTOP001';

UPDATE products SET 
  rating = 4.7,
  reviews_count = 156
WHERE sku = 'WATCH001';

UPDATE products SET 
  rating = 4.6,
  reviews_count = 98
WHERE sku = 'HEADPHONES001';