# Smile Gift Charity Mobile App

Ứng dụng di động cho CLB Thiện Nguyện Smile Gift được xây dựng bằng React Native.

## Tính năng chính

- **Trang chủ**: Hiển thị thông tin tổng quan, thống kê tác động và các chương trình nổi bật
- **Chương trình**: Danh sách các chương trình thiện nguyện với bộ lọc và tìm kiếm
- **Tin tức**: Cập nhật tin tức và chia sẻ từ CLB
- **Tình nguyện**: Tuyển dụng tình nguyện viên cho các hoạt động
- **Cá nhân**: Quản lý thông tin cá nhân và lịch sử tham gia

## Thiết kế UI/UX

Ứng dụng sử dụng hệ thống màu sắc và typography nhất quán:

### Màu sắc chính
- **Primary**: Xanh lá cây (#194923 - #3D8046)
- **Secondary**: Vàng cam (#F5A623)
- **Accent**: Đỏ (#E63946)
- **Neutral**: Xám (#F5F5F5 - #000000)

### Typography
- **Font sizes**: 12px - 48px
- **Font weights**: Normal, Medium, Semibold, Bold
- **Line heights**: Tight (1.2), Normal (1.5), Relaxed (1.75)

### Spacing
- **System**: 4px, 8px, 16px, 24px, 32px, 48px, 64px

## Cài đặt và chạy

### Yêu cầu
- Node.js >= 18
- React Native CLI
- Android Studio (cho Android)
- Xcode (cho iOS)

### Cài đặt dependencies
```bash
npm install
# hoặc
yarn install
```

### Chạy trên Android
```bash
npm run android
# hoặc
yarn android
```

### Chạy trên iOS
```bash
npm run ios
# hoặc
yarn ios
```

## Cấu trúc thư mục

```
src/
├── components/          # Các component tái sử dụng
│   ├── ui/             # UI components cơ bản
│   ├── ProgramCard.tsx # Card hiển thị chương trình
│   └── ArticleCard.tsx # Card hiển thị bài viết
├── constants/          # Hằng số và cấu hình
│   ├── colors.ts       # Hệ thống màu sắc
│   ├── typography.ts   # Typography system
│   └── spacing.ts      # Spacing system
├── navigation/         # Navigation setup
├── screens/           # Các màn hình chính
│   ├── HomeScreen.tsx
│   ├── ProgramsScreen.tsx
│   ├── NewsScreen.tsx
│   ├── VolunteerScreen.tsx
│   └── ProfileScreen.tsx
└── types/             # TypeScript types
```

## Thư viện sử dụng

- **@react-navigation**: Navigation
- **@tanstack/react-query**: Data fetching và caching
- **react-native-fast-image**: Tối ưu hiển thị hình ảnh
- **react-native-linear-gradient**: Gradient backgrounds
- **react-native-vector-icons**: Icons
- **react-native-reanimated**: Animations

## Tính năng nâng cao

- **Responsive Design**: Tối ưu cho mọi kích thước màn hình
- **Performance**: Sử dụng FlatList và lazy loading
- **Offline Support**: Caching dữ liệu với React Query
- **Accessibility**: Hỗ trợ screen readers
- **Dark Mode**: Sẵn sàng cho chế độ tối (có thể mở rộng)

## Đóng góp

1. Fork repository
2. Tạo feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Tạo Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Liên hệ

CLB Thiện Nguyện Smile Gift
- Email: smilegift.vn@gmail.com
- Facebook: facebook.com/smilegift.sg
- Phone: 0355.749.581