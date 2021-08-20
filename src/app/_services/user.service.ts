import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserProfile } from '../model/user-profile';


@Injectable()
export class UserService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<UserProfile[]>(`/users`);
    }

    getById(id: number| String) {
        return this.http.get(`/users/` + id);
    }

    register(user: UserProfile) {
        return this.http.post(`/users/register`, user);
    }

    update(user: UserProfile) {
        return this.http.put(`/users/` + user.id, user);
    }

    delete(id: number) {
        return this.http.delete(`/users/` + id);
    }
}