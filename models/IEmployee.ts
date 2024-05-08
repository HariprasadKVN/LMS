export interface IEmployee {
  empId:string,
  leaves: { [key: string]: { [key: string]: {allotted:string,[key:string]:string} } },
  effort: {[key:string]:{status:string|undefined, [key:string]:any}}
}