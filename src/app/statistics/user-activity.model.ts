import { User } from "../users/user.model";

export class UserActivity {
    user: User = new User();
    actionsCount: number = 0;
}