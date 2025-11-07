# 📚 LearnHub - Complete Documentation

## Overview
A modern, responsive courses catalog page built with React and Tailwind CSS. Features include advanced filtering, sorting, search functionality, and a mobile-optimized interface.

---

## ✨ Features

### 🔍 Search & Discovery
- **Real-time Search**: Instant search across course titles
- **Category Filtering**: Filter courses by subject categories
- **Smart Sorting**: Sort by price (low to high, high to low) or default order
- **Results Counter**: Shows number of courses found based on active filters

### 📱 Mobile-First Design
- **Collapsible Filters**: Space-saving collapsible filter panel on mobile devices
- **Touch-Optimized**: All buttons and controls sized for easy mobile interaction
- **Responsive Grid**: Adapts from 1 column (mobile) to 3 columns (desktop)
- **Sticky Filter Bar**: Filters remain accessible while scrolling

### 🎨 User Interface
- **Modern Design**: Gradient backgrounds and smooth transitions
- **Loading States**: Elegant loading spinner during data fetch
- **Error Handling**: User-friendly error messages with retry option
- **Empty States**: Helpful messaging when no courses match filters
- **Stats Dashboard**: Display key metrics (total courses, free courses, categories)

### ⚡ Performance
- **Efficient Filtering**: Client-side filtering for instant results
- **Optimized Rendering**: Smart re-renders only when necessary
- **Sticky Navigation**: Filters stay accessible without re-rendering page

---

## 🖼️ Screenshots

### Desktop View





### Mobile View



**Key Features:**
- Two-button layout (Filter + Sort split 50/50)
- Badge indicator shows active filters
- Compact, space-efficient design
- Single column course layout



## 🛠️ Technical Implementation

### Component Structure
```
Courses.jsx
├── Hero Section (Search)
├── Filters Section
│   ├── Mobile View (Collapsible)
│   └── Desktop View (Inline)
├── Courses Grid
├── CTA Section
└── Stats Section
```
## How to run
### Frontend
    npm install
    npm run dev
    run in localhost5173  if port forward run in https://nphgd72w-5173.inc1.devtunnels.ms
### backend 
    npm install
    npm start
    run in localhost5000 if port forward run in https://nphgd72w-5000.inc1.devtunnels.ms