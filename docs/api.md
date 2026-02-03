# Echo API Documentation

Base URL: `/api`

## Authentication
- **Private Routes**: Require a valid session cookie from Better Auth.
- **Public Routes**: accessible without user session, but may require API keys or Project Keys.

---

## Feedback Endpoints

### 1. Get Project Feedbacks
Retrieves a list of feedbacks for a specific project.

- **Endpoint**: `GET /api/feedback`
- **Access**: `Private` (User must own the project)

#### Query Parameters
| Param | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `projectId` | String | Yes | The ID of the project to fetch feedback for. |
| `type` | String | No | Filter by type (`BUG`, `FEATURE`, `OTHER`). |
| `page` | Number | No | Page number for pagination (default: 1). |
| `limit` | Number | No | Items per page (internal default: 20). |

#### Response
```json
{
  "feedbacks": [
    {
      "id": "cm...",
      "content": "Great app!",
      "type": "OTHER",
      "sentiment": "POSITIVE",
      "createdAt": "2024-03-20T10:00:00Z",
      "pageUrl": "https://example.com",
      "labels": []
    }
  ],
  "hasMore": true
}
```

---

### 2. Submit Feedback
Public endpoint used by the widget to submit new feedback.

- **Endpoint**: `POST /api/feedback`
- **Access**: `Public`

#### Request Body
| Field | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `projectKey` | String | Yes | The unique public key of the project. |
| `content` | String | Yes | The feedback message. |
| `type` | String | No | Category (`BUG`, `FEATURE`, `OTHER`). Default: `OTHER`. |
| `url` | String | No | The URL of the page where feedback was submitted. |

#### Response
```json
{
  "id": "cm...",
  "content": "Reported bug...",
  "type": "BUG",
  "projectId": "...",
  "createdAt": "..."
}
```

#### Errors
- `400 Bad Request`: Missing `projectKey` or `content`.
- `404 Not Found`: Invalid `projectKey`.
