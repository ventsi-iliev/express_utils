export function renameIdField(doc: Record<string, any>, fieldsToRemove?: Array<string>) {
    doc.id = doc._id;
    delete doc._id;

    if(fieldsToRemove && fieldsToRemove.length > 0) {
        for(let field of fieldsToRemove) {
            if(doc.hasOwnProperty(field)) {
                delete doc[field];
            }
        }
    }
}