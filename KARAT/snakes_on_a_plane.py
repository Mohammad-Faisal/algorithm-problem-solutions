'''
We have a two-dimensional board game involving snakes.  The board has two types of squares on it: +'s represent impassable squares where snakes cannot go, and 0's represent squares through which snakes can move.  Snakes can only enter on the edges of the board, and each snake can move in only one direction.  We'd like to find the places where a snake can pass through the entire board, moving in a straight line.

Here is an example board:

    col-->        0  1  2  3  4  5  6
               +----------------------
    row      0 |  +  +  +  0  +  0  0
     |       1 |  0  0  +  0  0  0  0
     |       2 |  0  0  0  0  +  0  0
     v       3 |  +  +  +  0  0  +  0
             4 |  0  0  0  0  0  0  0

Write a function that takes a rectangular board with only +'s and 0's, and returns two collections:

* one containing all of the row numbers whose row is completely passable by snakes, and  
* the other containing all of the column numbers where the column is completely passable by snakes.

Sample Inputs:

board1 = [['+', '+', '+', '0', '+', '0', '0'],
          ['0', '0', '+', '0', '0', '0', '0'],
          ['0', '0', '0', '0', '+', '0', '0'],
          ['+', '+', '+', '0', '0', '+', '0'],
          ['0', '0', '0', '0', '0', '0', '0']]

board2 = [['+', '+', '+', '0', '+', '0', '0'],
          ['0', '0', '0', '0', '0', '+', '0'],
          ['0', '0', '+', '0', '0', '0', '0'],
          ['0', '0', '0', '0', '+', '0', '0'],
          ['+', '+', '+', '0', '0', '0', '+']]

board3 = [['+', '+', '+', '0', '+', '0', '0'],
          ['0', '0', '0', '0', '0', '0', '0'],
          ['0', '0', '+', '+', '0', '+', '0'],
          ['0', '0', '0', '0', '+', '0', '0'],
          ['+', '+', '+', '0', '0', '0', '+']]

board4 = [['+']]

board5 = [['0']]

All test cases:

findPassableLanes(board1) => Rows: [4], Columns: [3, 6]
findPassableLanes(board2) => Rows: [], Columns: [3]
findPassableLanes(board3) => Rows: [1], Columns: []
findPassableLanes(board4) => Rows: [], Columns: []
findPassableLanes(board5) => Rows: [0], Columns: [0]

Complexity Analysis:

r: number of rows in the board
c: number of columns in the board
'''

board1 = [['+', '+', '+', '0', '+', '0', '0'],
          ['0', '0', '+', '0', '0', '0', '0'],
          ['0', '0', '0', '0', '+', '0', '0'],
          ['+', '+', '+', '0', '0', '+', '0'],
          ['0', '0', '0', '0', '0', '0', '0']]

board2 = [['+', '+', '+', '0', '+', '0', '0'],
          ['0', '0', '0', '0', '0', '+', '0'],
          ['0', '0', '+', '0', '0', '0', '0'],
          ['0', '0', '0', '0', '+', '0', '0'],
          ['+', '+', '+', '0', '0', '0', '+']]

board3 = [['+', '+', '+', '0', '+', '0', '0'],
          ['0', '0', '0', '0', '0', '0', '0'],
          ['0', '0', '+', '+', '0', '+', '0'],
          ['0', '0', '0', '0', '+', '0', '0'],
          ['+', '+', '+', '0', '0', '0', '+']]

board4 = [['+']]

board5 = [['0']]

def findPassableLanes(board):
    rows =[]
    cols=[]
    for row in range(len(board)):
        clear = True;
        for val in board[row]:
            if(val == '+'):
                clear = False
                break
        if clear:
            rows.append(row)
            
    for j in range(len(board[0])):
        clear = True
        for i in range(len(board)):
            if(board[i][j] == '+'):
                clear = False
                break
        if clear:
            cols.append(j)
    return [rows,cols]
            
# print(findPassableLanes(board1))
# print(findPassableLanes(board2))
# print(findPassableLanes(board3))
# print(findPassableLanes(board4))
# print(findPassableLanes(board5))

'''
We have a two-dimensional board game involving snakes.  The board has two types of squares on it: +'s represent impassable squares where snakes cannot go, and 0's represent squares through which snakes can move.

Snakes may move in any of four directions - up, down, left, or right - one square at a time, but they will never return to a square that they've already visited.  If a snake enters the board on an edge square, we want to catch it at a different exit square on the board's edge.

The snake is familiar with the board and will take the route to the nearest reachable exit, in terms of the number of squares it has to move through to get there. Note that there may not be a reachable exit.

Here is an example board:

    col-->        0  1  2  3  4  5  6  7  8
               +---------------------------
    row      0 |  +  +  +  +  +  +  +  0  0
     |       1 |  +  +  0  0  0  0  0  +  +
     |       2 |  0  0  0  0  0  +  +  0  +
     v       3 |  +  +  0  +  +  +  +  0  0
             4 |  +  +  0  0  0  0  0  0  +
             5 |  +  +  0  +  +  0  +  0  +

Write a function that takes a rectangular board with only +'s and O's, along with a starting point on the edge of the board, and returns the coordinates of the nearest exit to which it can travel.  If there is a tie, return any of the nearest exits.
-----------------------------------------------------
Sample inputs:
board1 = [['+', '+', '+', '+', '+', '+', '+', '0', '0'],
          ['+', '+', '0', '0', '0', '0', '0', '+', '+'],
          ['0', '0', '0', '0', '0', '+', '+', '0', '+'],
          ['+', '+', '0', '+', '+', '+', '+', '0', '0'],
          ['+', '+', '0', '0', '0', '0', '0', '0', '+'],
          ['+', '+', '0', '+', '+', '0', '+', '0', '+']]
start1_1 = (2, 0) # Expected output = (5, 2) 
start1_2 = (0, 7) # Expected output = (0, 8)
start1_3 = (5, 2) # Expected output = (2, 0) or (5, 5)
start1_4 = (5, 5) # Expected output = (5, 7)

board2 = [['+', '+', '+', '+', '+', '+', '+'],
          ['0', '0', '0', '0', '+', '0', '+'],
          ['+', '0', '+', '0', '+', '0', '0'],
          ['+', '0', '0', '0', '+', '+', '+'],
          ['+', '+', '+', '+', '+', '+', '+']]
start2_1 = (1, 0) # Expected output = null (or a special value representing no possible exit)
start2_2 = (2, 6) # Expected output = null 

board3 = [['+', '0', '+', '0', '+',],
          ['0', '0', '+', '0', '0',],
          ['+', '0', '+', '0', '+',],
          ['0', '0', '+', '0', '0',],
          ['+', '0', '+', '0', '+']]
start3_1 = (0, 1) # Expected output = (1, 0)
start3_2 = (4, 1) # Expected output = (3, 0)
start3_3 = (0, 3) # Expected output = (1, 4)
start3_4 = (4, 3) # Expected output = (3, 4)

board4 = [['+', '0', '+', '0', '+',],
          ['0', '0', '0', '0', '0',],
          ['+', '+', '+', '+', '+',],
          ['0', '0', '0', '0', '0',],
          ['+', '0', '+', '0', '+']]
start4_1 = (1, 0) # Expected output = (0, 1)
start4_2 = (1, 4) # Expected output = (0, 3)
start4_3 = (3, 0) # Expected output = (4, 1)
start4_4 = (3, 4) # Expected output = (4, 3)

board5 =  [['+', '0', '0', '0', '+',],
           ['+', '0', '+', '0', '0',],
           ['+', '0', '0', '0', '0',],
           ['+', '0', '0', '0', '+']]
start5_1 = (0, 1) # Expected output = (0, 2)
start5_2 = (3, 1) # Expected output = (3, 2)
start5_3 = (1, 4) # Expected output = (2, 4)

board6 = [['+', '+', '+', '+', '+', '+', '+', '+'],
          ['0', '0', '0', '0', '0', '0', '0', '0'],
          ['+', '0', '0', '0', '0', '0', '0', '0'],
          ['+', '0', '0', '0', '0', '0', '0', '+'],
          ['0', '0', '0', '0', '0', '0', '0', '+'],
          ['+', '+', '+', '+', '+', '+', '0', '+']]

start6_1 = (4,0) # Expected output = (1, 0)

All test cases:
findExit(board1, start1_1) => (5, 2)
findExit(board1, start1_2) => (0, 8)
findExit(board1, start1_3) => (2, 0) or (5, 5)
findExit(board1, start1_4) => (5, 7)
findExit(board2, start2_1) => null (or a special value representing no possible exit)
findExit(board2, start2_2) => null
findExit(board3, start3_1) => (1, 0)
findExit(board3, start3_2) => (3, 0)
findExit(board3, start3_3) => (1, 4)
findExit(board3, start3_4) => (3, 4)
findExit(board4, start4_1) => (0, 1)
findExit(board4, start4_2) => (0, 3)
findExit(board4, start4_3) => (4, 1)
findExit(board4, start4_4) => (4, 3)
findExit(board5, start5_1) => (0, 2)
findExit(board5, start5_2) => (3, 2)
findExit(board5, start5_3) => (2, 4)
findExit(board6, start6_1) => (1, 0)

Complexity Analysis:

r: number of rows in the board
c: number of columns in the board
'''

def dfs(i,j,vis,board, steps , start):
   
    if i<0 or j<0 or i >= len(board) or j >= len(board[0]):
        return [-1,-1,10000000]
    if board[i][j] == '+' or  vis[i][j] == True:
        return [-1,-1,10000000]
    
    if (i==0 or j==0 or i==len(board)-1 or j == len(board[0])-1) and (i==start[0] and j==start[1]) == False:
        
        return [i,j,steps]
    vis[i][j] = True
    
    
    minSteps = 100000;
    iIndex = -1;
    jIndex = -1;
    
    directions = [[-1,0] , [1,0] ,[0,1], [0,-1]]
    for dir in directions:
        result = dfs(i+dir[0] , j+dir[1], vis, board,steps+1  , start)
        # print(result)
        if result[2] < minSteps:
            minSteps = result[2]
            iIndex = result[0]
            jIndex = result[1]
        minSteps = min(minSteps, result[2])
    vis[i][j] = False
    
    return [iIndex , jIndex ,minSteps]
        
    


def findExit(board , start):
    vis= [];
    for row in board:
        visRow = []
        for val in row:
            if val == '+':
                visRow.append(True)
            else:
                visRow.append(False)
        vis.append(visRow)
    result =dfs(start[0], start[1] , vis , board , 0 , start)
    return(result)    
    


board1 = [['+', '+', '+', '+', '+', '+', '+', '0', '0'],
           ['+', '+', '0', '0', '0', '0', '0', '+', '+'],
           ['0', '0', '0', '0', '0', '+', '+', '0', '+'],
           ['+', '+', '0', '+', '+', '+', '+', '0', '0'],
           ['+', '+', '0', '0', '0', '0', '0', '0', '+'],
           ['+', '+', '0', '+', '+', '0', '+', '0', '+']]
start1_1 = (2, 0) # Expected output = (5, 2) 
start1_2 = (0, 7) # Expected output = (0, 8)
start1_3 = (5, 2) # Expected output = (2, 0) or (5, 5)
start1_4 = (5, 5) # Expected output = (5, 7)

board2 = [['+', '+', '+', '+', '+', '+', '+'],
           ['0', '0', '0', '0', '+', '0', '+'],
           ['+', '0', '+', '0', '+', '0', '0'],
           ['+', '0', '0', '0', '+', '+', '+'],
           ['+', '+', '+', '+', '+', '+', '+']]
start2_1 = (1, 0) # Expected output = null (or a special value representing no possible exit)
start2_2 = (2, 6) # Expected output = null 

board3 = [['+', '0', '+', '0', '+'],
           ['0', '0', '+', '0', '0'],
           ['+', '0', '+', '0', '+'],
           ['0', '0', '+', '0', '0'],
           ['+', '0', '+', '0', '+']]
start3_1 = (0, 1) # Expected output = (1, 0)
start3_2 = (4, 1) # Expected output = (3, 0)
start3_3 = (0, 3) # Expected output = (1, 4)
start3_4 = (4, 3) # Expected output = (3, 4)

board4 = [['+', '0', '+', '0', '+'],
           ['0', '0', '0', '0', '0'],
           ['+', '+', '+', '+', '+'],
           ['0', '0', '0', '0', '0'],
           ['+', '0', '+', '0', '+']]
start4_1 = (1, 0) # Expected output = (0, 1)
start4_2 = (1, 4) # Expected output = (0, 3)
start4_3 = (3, 0) # Expected output = (4, 1)
start4_4 = (3, 4) # Expected output = (4, 3)

board5 = [['+', '0', '0', '0', '+'],
           ['+', '0', '+', '0', '0'],
           ['+', '0', '0', '0', '0'],
           ['+', '0', '0', '0', '+']]
start5_1 = (0, 1) # Expected output = (0, 2)
start5_2 = (3, 1) # Expected output = (3, 2)
start5_3 = (1, 4) # Expected output = (2, 4)


board6 = [['+', '+', '+', '+', '+', '+', '+', '+'],
          ['0', '0', '0', '0', '0', '0', '0', '0'],
          ['+', '0', '0', '0', '0', '0', '0', '0'],
          ['+', '0', '0', '0', '0', '0', '0', '+'],
          ['0', '0', '0', '0', '0', '0', '0', '+'],
          ['+', '+', '+', '+', '+', '+', '0', '+']]

start6_1 = (4, 0) # Expected output = (1, 0)

# print(findExit(board1, start1_1)) # => (5, 2))
# print(findExit(board1, start1_2)) # => (5, 2))
# print(findExit(board1, start1_3)) # => (5, 2))
# print(findExit(board1, start1_4)) # => (5, 2))



# print(findExit(board3, start3_1)) # => (5, 2))
# print(findExit(board3, start3_2)) # => (5, 2))
# print(findExit(board3, start3_3)) # => (5, 2))
# print(findExit(board3, start3_4)) # => (5, 2))

# print(findExit(board4, start4_1)) # => (5, 2))
# print(findExit(board4, start4_2)) # => (5, 2))
# print(findExit(board4, start4_3)) # => (5, 2))
# print(findExit(board4, start4_4)) # => (5, 2))

'''
Snakes make nests of open spaces, but they avoid connecting their nest with other snakes' nests.  Each nest (consisting of one or more connected 0's) houses one snake only, though a single nest may have one or many entrances on the edges of the board, or possibly none at all.  Each 0 for a nest that is on an edge counts as its own entrance, even if two or more of them are next to one another.

Here is an example board:

    col-->        0  1  2  3  4  5  6  7  8
               +---------------------------
    row      0 |  +  +  +  +  +  +  +  0  0
     |       1 |  +  +  0  0  0  0  0  +  +
     |       2 |  0  0  0  0  0  +  +  0  +
     v       3 |  +  +  0  +  +  +  +  0  0
             4 |  +  +  0  0  0  0  0  0  +
             5 |  +  +  0  +  +  0  +  0  +

Given a board, return a collection that, for each nest, lists the nest's number of entrances (open spaces on the edge of the board) that that nest includes. 

Sample inputs: 
board1 = [['+', '+', '+', '+', '+', '+', '+', '0', '0'],
          ['+', '+', '0', '0', '0', '0', '0', '+', '+'],
          ['0', '0', '0', '0', '0', '+', '+', '0', '+'],
          ['+', '+', '0', '+', '+', '+', '+', '0', '0'],
          ['+', '+', '0', '0', '0', '0', '0', '0', '+'],
          ['+', '+', '0', '+', '+', '0', '+', '0', '+']]

board2 = [['+', '+', '+', '+', '+', '+'],
          ['0', '0', '0', '+', '0', '+'],
          ['+', '0', '+', '0', '0', '0'],
          ['+', '+', '+', '+', '+', '+']]

board3 = [['+', '0', '+', '+', '+', '0', '+', '0', '0'],
          ['+', '0', '+', '0', '0', '0', '0', '+', '+'],
          ['0', '0', '0', '0', '0', '+', '+', '0', '+'],
          ['+', '+', '+', '+', '+', '+', '+', '0', '0'],
          ['+', '+', '0', '0', '0', '0', '0', '0', '+'],
          ['+', '+', '0', '+', '+', '0', '+', '0', '+']]

board4 = [['+', '+', '+'],
          ['+', '0', '+'],
          ['+', '+', '+']]

board5 = [['+']]

board6 = [['0', '0'],
          ['0', '0']]

All test cases:
getNestEntranceCount(board1) => [2, 5]
getNestEntranceCount(board2) => [1, 1]
getNestEntranceCount(board3) => [2, 4, 3]
getNestEntranceCount(board4) => [0]
getNestEntranceCount(board5) => []
getNestEntranceCount(board6) => [4]

Complexity Analysis:

r: number of rows in the board
c: number of columns in the board
'''


def dfs(i,j,vis,board, count):
    # print(i,j)
    if i<0 or j<0 or i >= len(board) or j >= len(board[0]):
        return [count,vis]
    if board[i][j] == '+' or  vis[i][j] == True:
        return [count,vis]
    
    if (i==0 or j==0 or i==len(board)-1 or j == len(board[0])-1):
        count = count +1
    
    vis[i][j] = True
    directions = [[-1,0] , [1,0] ,[0,1], [0,-1]]
    for dir in directions:
        res = dfs(i+dir[0] , j+dir[1], vis, board, count )
        count = res[0]
        vis = res[1]
    
    
    return [count , vis]
        
    


def getNestEntranceCount(board):
    vis= [];
    for row in board:
        visRow = []
        for val in row:
            if val == '+':
                visRow.append(True)
            else:
                visRow.append(False)
        vis.append(visRow)
    result =[]
    for i in range (len(board)):
        visRow = []
        for j in range (len(board[0])):
            if board[i][j] == '0' and vis[i][j] == False:
                res = dfs(i,j , vis , board , 0 )
                vis=res[1]
                # print(res)
                result.append(res[0])
    return(result)    

board1 = [['+', '+', '+', '+', '+', '+', '+', '0', '0'],
          ['+', '+', '0', '0', '0', '0', '0', '+', '+'],
          ['0', '0', '0', '0', '0', '+', '+', '0', '+'],
          ['+', '+', '0', '+', '+', '+', '+', '0', '0'],
          ['+', '+', '0', '0', '0', '0', '0', '0', '+'],
          ['+', '+', '0', '+', '+', '0', '+', '0', '+']]

board2 = [['+', '+', '+', '+', '+', '+'],
          ['0', '0', '0', '+', '0', '+'],
          ['+', '0', '+', '0', '0', '0'],
          ['+', '+', '+', '+', '+', '+']]

board3 = [['+', '0', '+', '+', '+', '0', '+', '0', '0'],
          ['+', '0', '+', '0', '0', '0', '0', '+', '+'],
          ['0', '0', '0', '0', '0', '+', '+', '0', '+'],
          ['+', '+', '+', '+', '+', '+', '+', '0', '0'],
          ['+', '+', '0', '0', '0', '0', '0', '0', '+'],
          ['+', '+', '0', '+', '+', '0', '+', '0', '+']]

board4 = [['+', '+', '+'],
          ['+', '0', '+'],
          ['+', '+', '+']]

board5 = [['+']]

board6 = [['0', '0'],
          ['0', '0']]
          
print(getNestEntranceCount(board1))
print(getNestEntranceCount(board2))
print(getNestEntranceCount(board3))
print(getNestEntranceCount(board4))
print(getNestEntranceCount(board5))
print(getNestEntranceCount(board6))