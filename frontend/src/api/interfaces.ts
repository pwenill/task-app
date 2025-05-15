interface ResponseRequest {
  status: number;
  data?: {
    message: string;
    token: string;
    url: string;
    completed: boolean;
    access_content: boolean;
    account_verified: boolean;
    account_completed: boolean;
    type: string;
  } | null;
}

interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
}

export type { ResponseRequest, Task };
