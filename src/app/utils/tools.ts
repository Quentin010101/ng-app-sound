export class Tools{
    
  public static isBlank(str: String | null | undefined): boolean{
    return str == null || str == undefined || str == '' || str.length < 1
  }
}