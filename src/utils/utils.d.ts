export namespace Router {
    interface Next {
        (url?: string): any
    }

    interface Hook {
        (currentPath: string | undefined, url: string, next: Next)
    }

}
