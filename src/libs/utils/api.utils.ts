
class Api {
    constructor(private readonly baseUrl:string){
    }
    public url(endpoint:string):string{
        return `${this.baseUrl}${endpoint}`
    }
}
const myApi = new Api("http://49.236.210.169:80/");
// const myApi = new Api("https://hairsalondanangtss.io.vn/");
export {
    myApi
}
