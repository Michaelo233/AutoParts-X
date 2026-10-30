### 1. Custom Hooks (T.1)
I worked on reusable custom hooks to improve code organization and reduce duplicated logic.
useUserParts.ts — Manages user parts state and add/remove interactions.
**useAutoPartSearch.ts** — Manages automotive part search results.
**useVehicleModels.ts** — Manages loading, results, and errors for vehicle information.
**useStorage()** — Provides shared search preferences and storage consent through React Context.
#### 2. Service Layer (T.2)
I created services to separate business logic from components:
**myPartsService.ts** — Handles part operations and ID generation.
**carPartSearchService.ts** — Handles searching and filtering automotive parts.
**vehicleService.ts** — Validates vehicle search parameters and caches API results.
#### 3. Repository Layer (I.1)
I created repositories to centralize data access:
**myPartsRepository.ts** — Retrieves and normalizes users and automotive parts 
from test data.
**carPartSearchRepository.ts** — Retrieves automotive parts for searching.
**vehicleRepository.ts** — Retrieves external vehicle information from the NHTSA API
#### 4.  Generate ID 
**generatePartId()** — Generates listing IDs such as P001, P002, and P003.
**generateAutoPartId()** — Generates automotive part IDs such as PART001, 
PART002, and PART003.
**generateCategoryId()** — Generates category IDs such as CT001, CT002, and CT003.
**generateUserId()** — Generates user IDs such as U001, U002, and U003.
#### 5. Refactored Components (I.3)
I updated the marketplace and My Parts functionality, improved the Add Auto Part form, 
implemented automotive categories, and adjusted the search functionality.
I also improved styling, navigation.
#### 6. Local Persistence (S.1 — Optional)
I implemented Local Storage for search preferences. Users can enable storage,
save their search terms, and clear saved data.
I connected Home.tsx, HeroSection.tsx, and the search component to StorageContext.
I confirmed through Firefox Developer Tools that the search term Engine was 
saved successfully.
#### 7. Third-Party API (S.2 — Optional)
I implemented vehicle model lookup using the NHTSA API.
The implementation follows the Repository → Service → Hook → Component architecture 
and includes caching and error handling.
#### 8. Unit Testing
I added test files for the parts search service, user parts service, and vehicle
 service, including tests for validation, caching, and failed API requests.
