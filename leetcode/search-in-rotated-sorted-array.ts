function findPivotIndex (nums: number[]) {
    let left = 0;
    let right = nums.length -1;
    let firstItem = nums[0];
    if(nums[left] < nums[right]) return -1;
    while (left<right){
        const midIndex = Math.floor( (left+right)/2);
        const leftIndex = midIndex -1 >= 0 ? midIndex -1 : midIndex;
        const rightIndex = midIndex +1 < nums.length ?  midIndex +1 : midIndex;
        if(nums[midIndex] >= nums[leftIndex] && nums[midIndex] >= nums[rightIndex]){
            return rightIndex;
        }
        if(nums[midIndex] <= nums[leftIndex] && nums[midIndex] <= nums[rightIndex]){
            return midIndex;
        }
        if(nums[midIndex] < firstItem){
            right = midIndex-1;
        }else{
            left = midIndex+1;
        }
    }
    
    return -1;
}

const findBinarySearch= (nums: number[] , item: number , start: number , end: number) => {
    
    let left = start;
    let right = end;
    
    while(left < right){
        const mid = Math.floor( (left+right)/2);
        
        if(nums[mid] === item) return mid;
        
        if (nums[mid]<item){
            left = mid+1;
        }else{
            right = mid-1;
        }
        
       
    }
    
     if(left === right && nums[left] === item) return left;
    
    return -1;
}



function search(nums: number[], target: number): number {
    const pivotIndex = findPivotIndex(nums);
    let start = 0;
    let end = nums.length- 1;
    if(pivotIndex !== -1){
        if(nums[nums.length-1] >= target){
            start = pivotIndex;
        }else{
            end = pivotIndex - 1;
        }
    }
    const position = findBinarySearch(nums , target  , start , end );
    return position;
};
