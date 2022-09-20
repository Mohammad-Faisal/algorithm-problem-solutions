const binarySearch = (nums: number[] , target: number) => {
    
    let left = 0;
    let right = nums.length -1;
    
    while(left<=right){
        const mid = Math.floor( (left+right)/2);
        
        if(nums[mid] === target) return mid;
        
        if(nums[mid] < target){
            left= mid+1;
        }else{
            right = mid -1;
        }
    }
    return -1;
}

const findRightBoundary = (nums , start , end , target) => {
    let left = start;
    let right= end;
    
    while(left <= right){
        const mid = Math.floor( (left + right)/2);
        
        if(nums[left] === target && ( left+1 ===  nums.length || nums[left+1] !== target) )return left;

        if(nums[mid] === target && nums[mid+1] !== target){
            return mid;
        }
        
        if(nums[mid] === target){
            left = mid + 1;
        }else{
            right = mid-1;
        }
    }
}


const findLeftPosition = (nums , start , end , target) => {
    let left = start;
    let right= end;
    
    while(left <= right){
        const mid = Math.floor( (left + right)/2);
        if(nums[left] === target && ( left-1 ===  0 || nums[left-1] !== target) )return left;
        if(nums[mid] === target && nums[mid-1] !== target){
            return mid;
        }
        if(nums[mid] === target){
            right = mid-1;
            
        }else{
            left = mid + 1;
        }
    }
}

function searchRange(nums: number[], target: number): number[] {
    const position = binarySearch(nums , target);
    if(position === -1) return [-1 , -1];
    const findRight = findRightBoundary(nums , position , nums.length-1 , target)
    const findLeft = findLeftPosition(nums , 0 , position, target)
    
    return [findLeft , findRight ]
};
