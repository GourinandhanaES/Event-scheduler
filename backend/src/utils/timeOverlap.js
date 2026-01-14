const isOverlapping = (newStart,newEnd,existingStart,existingEnd)=>{
    return newStart < existingEnd && newEnd > existingStart; 
}
module.exports = isOverlapping;