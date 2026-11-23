# Sprint 3 – Architecture Documentation (MO)

## 1. Custom Hook: useUserParts

**What it does:**  
The `useUserParts` hook manages the authenticated/selected user state, the full user list, loading state, and error handling for the My Parts features. It loads all users, chooses the default/current user, and exposes actions to add, remove, and toggle parts for sale.

**Why this logic belongs here:**  
This hook owns React state and side effects, while delegating data fetching and mutation operations to the service layer. Keeping the UI lifecycle (`useEffect`, loading state, current user selection, repository subscription) in the hook keeps component code focused on rendering, while business rules stay outside the component tree.

**Where it is used:**  
`src/App.tsx` calls `useUserParts()` to populate `currentUser` and `users` and pass the related handlers into the routes for `myParts` and the add-part flows. `src/pages/MyParts.tsx` receives the resulting `user`, `users`, and callback props to render the My Parts dashboard and search/filter functionality.

## 2. Service: userPartService

**What it does:**  
The `userPartService` layer validates part and user data before updating the repository. It provides accessors like `getAllUsers`, `getUserByName`, `addPartToUser`, `removePartFromUser`, and `togglePartSaleStatus`, and it also exposes the list of visible market parts.

**Why this logic belongs here:**  
The service is the correct place for business validation and orchestration. It enforces rules such as requiring a user name, part name, positive price, and description before a mutation is committed, while leaving raw data persistence and listener management to the repository. This ensures the hook stays UI-focused and the repository stays data-focused.

**Where it is used:**  
`src/hooks/useUserParts.ts` calls this service when loading users or creating, updating, or removing parts. The service then delegates the actual in-memory data changes to `userPartRepository` so the UI can stay synchronized through repository subscriptions.

## 3. Repository: userPartRepository

**What it does:**  
The `userPartRepository` stores the normalized in-memory collection of users and parts, manages cloning so callers cannot mutate shared state accidentally, and emits change notifications to listeners when the data set changes.

**Why this logic belongs here:**  
Data access and persistence concerns belong in a repository. This implementation holds the source-of-truth array, centralizes user lookup by name, and keeps all mutation logic in one place so the rest of the application does not need to know how user/part state is stored or normalized.

**Where it is used:**  
`src/services/userPartService.ts` calls `userPartRepository` for all reads and writes. `src/hooks/useUserParts.ts` subscribes to repository change notifications so the component automatically refreshes when a part is added, removed, or updated.

## 4. Supplemental My Parts Helper Layer: MyPartsService and myPartsRepository

### 4.1 Service: MyPartsService

**What it does:**  
`MyPartsService` provides a smaller, My Parts-specific API for retrieving a user by ID, listing a user’s parts, and adding/removing parts from the current local list. It is designed around the My Parts page workflow instead of the broader user-part state management used by the app shell.

**Why this logic belongs here:**  
I kept the My Parts helper logic separate from the main `userPartService` because it handles a more direct, data-fetching use case: user-by-ID lookup and collection manipulation for a specific part list. This keeps the broader app service concerned with user creation, validation, and live state updates, while this helper focuses on simple part collection operations.

**Where it is used:**  
This service is exercised in `src/test/userPartsService.test.ts` and interacts with `myPartsRepository` for retrieval and mutation helpers. It is not the primary runtime flow for the app UI; the active app uses `useUserParts` and `userPartService` instead.

### 4.2 Repository: myPartsRepository

**What it does:**  
`myPartsRepository` exposes a simplified in-memory data source for users and parts keyed by user ID, returning all users, a specific user, a user’s part list, or the full part collection across users.

**Why this logic belongs here:**  
This repository is intentionally narrow: it is focused on straightforward lookup and normalization for the My Parts data model. By keeping it separate from `userPartRepository`, I avoid mixing a generic live state management repository with a simpler page-oriented lookup repository, which keeps each layer’s responsibilities clear.

**Where it is used:**  
`src/services/myPartsService.ts` calls `myPartsRepository` to access user and part records. The repository is primarily used for focused My Parts data operations and validation in the unit tests that cover the My Parts service behavior.

## 5. Architecture Flow

The current runtime structure is:

`src/App.tsx → src/hooks/useUserParts.ts → src/services/userPartService.ts → src/repositories/userPartRepository.ts`

The My Parts helper flow is:

`src/services/myPartsService.ts → src/repositories/myPartsRepository.ts`

This separation keeps presentation logic (`App.tsx`, `MyParts.tsx`), React state management (`useUserParts`), business validation (`userPartService`), and persistent data access (`userPartRepository`) in distinct layers, while the smaller My Parts helper layer handles ID-based lookup and list operations without interfering with the main state lifecycle.
