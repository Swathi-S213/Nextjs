import { ApiClient, DefaultApi } from "@anansi-lineage/anansi-sdk";
export function getApiClient (){
    var apiClient = new ApiClient();
 apiClient.basePath = "https://datalineage2.azurewebsites.net";
 apiClient.authentications["JWT"].apiKey = "eyJhbGciOiJSUzI1NiIsImtpZCI6Ilg1ZVhrNHh5b2pORnVtMWtsMll0djhkbE5QNC1jNTdkTzZRR1RWQndhTmsiLCJ0eXAiOiJKV1QifQ.eyJzdWIiOiIzOTAwZDZkYy04ZDRhLTQyNDYtOTNjMi1iYzdjYmEzZWY4MzkiLCJuYW1lIjoiU3dhdGhpIiwiZW1haWxzIjpbInN3YXRoaS5zQHN1a2V0YS5pbiJdLCJ0ZnAiOiJCMkNfMV9zaWdudXBfc2lnbmluIiwibm9uY2UiOiIxIiwic2NwIjoicmVhZCIsImF6cCI6ImM5MGZlZDIxLWIzOGEtNDlkNy04MTY2LTkzMGVlODdmMWIyZSIsInZlciI6IjEuMCIsImlhdCI6MTcxNzE1MDMyMywiYXVkIjoiYzkwZmVkMjEtYjM4YS00OWQ3LTgxNjYtOTMwZWU4N2YxYjJlIiwiZXhwIjoxNzE3MTUzOTIzLCJpc3MiOiJodHRwczovL2FuYW5zaWh1Yi5iMmNsb2dpbi5jb20vOGVjMTg5ZGYtN2QxNi00MDY0LWEwMmUtNWZhNjNiNjUxYTNmL3YyLjAvIiwibmJmIjoxNzE3MTUwMzIzfQ.XNYSN80wq6zSiiY5ZGwhPLp_PXcKEYvd0V6Uwa4gwxur8w1OKmvHht1x26yGQygezN1Fw3RC9f6esSW_QUGTG-m8Q_ryy54ttMHpLm1Th-TkkaLLtHhuEJATAXbJRj9zpssTC-J8Qfs_FWmEDofvR6gp502RLccbsqvZLlfSykYEGvY1SmmD9CSdP5ktlXLEe9JpNdb0TCiCtxnbHhMreeX8BVWFYctaKfvEjXpB5bBLzRVraRdALzyK3vLg21elfjcc3R-KjLwpMGvRYIbTKnZxA4FIxxZG6wUw_G6JwrnmUb7y40J49u--cIws_G_QmaKnU3xyIm3OrDHVDQuxsQ"; // Update with your API key
 apiClient.authentications["JWT"].apiKeyPrefix = "Bearer";
 const defaultClient = new DefaultApi(apiClient);
 return defaultClient
}