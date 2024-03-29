import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { FbCreateResponse, Post } from "./interfaces";
import { environment } from "src/environments/environment";

@Injectable({ providedIn: 'root' })

export class PostService {
    constructor(private http: HttpClient) { }
    create(post: Post): Observable<Post> {
        return this.http.post<Post>(`${environment.fbDbUrl}/posts.json`, post)
            .pipe(
                map((response: FbCreateResponse | any) => {
                    return {
                        ...post,
                        id: response.name,
                        date: new Date(post.date)
                    }
                })
            )
    }

    getAll(): Observable<Post[]> {
        return this.http.get<Post[]>(`${environment.fbDbUrl}/posts.json`)
            .pipe(
                map((response: { [key: string]: any }) => {
                    return Object
                        .keys(response)
                        .map(key => ({
                            ...response[key],
                            id: key,
                            date: new Date(response[key].date)
                        }))

                })
            )
    }
    getById(id: any): Observable<Post>{
        return  this.http.get<Post>(`${environment.fbDbUrl}/posts/${id}.json`)
        .pipe(
            map((post: Post | any) => {
                return {
                    ...post,
                    id,
                    date: new Date(post.date)
                }
            })
        )
    }
    update(post: Post):Observable<Post>{
        return this.http.patch<Post>(`${environment.fbDbUrl}/posts/${post.id}.json`, post)
    }
    remove(id: any): Observable<void> {
        return  this.http.delete<void>(`${environment.fbDbUrl}/posts/${id}.json`)
    }

}