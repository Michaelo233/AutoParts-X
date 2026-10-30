# Sprint 3 – Architecture Documentation (JA)

## 1. Custom Hook: useProducts

**What it does:**  
The `useProducts` hook manages product listing state, loading status, and product operations for React components.

**Why this logic belongs here:**  
It separates React presentation state from business logic and data access. Product operations are delegated to the product service.

**Where it is used:**  
`src/pages/Products.tsx` uses this hook to display available products and handle product removal. `src/pages/ProductDetails.tsx` also uses this hook to access product listing data when displaying individual product details.

## 2. Service: productService

**What it does:**  
The product service handles product-related business operations, including filtering products available for sale.

**Why this logic belongs here:**  
Business rules, such as checking whether a product is for sale, belong in the service rather than React components or repositories.

**Where it is used:**  
`src/hooks/useProducts.ts` calls the product service to retrieve and manage products. `src/pages/ProductDetails.tsx` also uses the service to retrieve individual product details by ID.

## 3. Repository: productRepository

**What it does:**  
The product repository provides CRUD methods for retrieving, adding, updating, and removing auto parts.

**Why this logic belongs here:**  
Data access belongs in repositories. This keeps components and services independent of how product data is stored.

**Where it is used:**  
`src/services/productService.ts` calls the repository, which accesses the shared data through `userPartRepository`.

## 4. Architecture Flow

The product listing follows this structure:

`Products.tsx → useProducts.ts → productService.ts → productRepository.ts → userPartRepository.ts`

This separates presentation logic, business logic, and data access according to the Sprint 3 architecture requirements.