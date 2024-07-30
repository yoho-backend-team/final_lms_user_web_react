


export const getYearList = () => {
    const date = new Date()
    const list = []
    const total = date.getFullYear() - 2022
    const total_years = total + 2022
    console.log(total,total_years)
    for(let i=total;i--;i===0){
        list.push(i+2024)
    }
    return list
}