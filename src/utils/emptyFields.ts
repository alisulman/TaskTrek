import { RegisterationType } from "@/Type/type"

const EmptyFields = (fields: RegisterationType) => {
    let empty = []
    for(let field in fields){
        if (!fields[field as keyof RegisterationType]) {
            empty.push(field)
        }
    }
    return empty
}

export default EmptyFields