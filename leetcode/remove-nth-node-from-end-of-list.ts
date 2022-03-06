class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

function removeNthFromEnd(head: ListNode | null, n: number): ListNode | null {
  let count = 1;
  let current: ListNode = head;

  while (current.next != null) {
    current = current.next;
    count++;
  }

  if (count === 1) {
    return null;
  }

  let finalHead = head;
  const indexToRemove = count - n;
  let index = 0;
  current = head;
  let prev = null;

  while (1) {
    if (index == indexToRemove) {
      // remove the index and break;
      if (prev) {
        prev.next = current.next;
      } else {
        finalHead = current.next;
        current.next = null;
      }
      break;
    }
    prev = current;
    current = current.next;
    index++;

    if (current == null) break;
  }
  return finalHead;
}
