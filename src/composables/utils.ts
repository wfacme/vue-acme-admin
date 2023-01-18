import router from "~/router"

export const setDocumentTitle = function (title: string): void {
    if (title && typeof title !== undefined)
        document.title = title
}
export const pageReload = function (): void {
    // router.push({name:'refresh'});
    router.go(0);

}