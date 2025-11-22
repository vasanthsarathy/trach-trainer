# Hand-Authored Rules

we can write a number as 

a b c d  X  11 

We start with the rightmost digit. In this case it is "d".  The digit under current consideration is called "the number". It's neighbor is the digit to its right. In the case of "d" the "neighbor" is 0 because there is no digit to its right. 

## Times 11
So, the times 11 rule is: 

"add the neighbor" which means take the "number" and add to neighbor. We add a zero to the front of the operand 1 to ensure we include the leftmost digit. 

So, for abcd X 11, we follow the following procedure 

0 a b c d  X  11
---------

number + neighbor
d + 0 = d 
c + d = (c+d), if there is carry over then that is carried to b + c 
b + c = (b+c)
a + b = (a+b)
0 + a = a 

For example 

847 x 11
---

7 + 0 = 7
4 + 7 = 1  (because 11 is 1 with carry 1)
8 + 4 = 12 + 1 carry = 3 (because 13 is 3 with carry 1 )
0 + 8 = 8 + 1 carry = 9 

Final answer: 9317

Example 2

09999 x 11
----
9+0 = 9
9+9 = 18 = 8 (Carry 1)
9+9 = 18 + 1 carry = 19 = 9 (Carry 1)
9+9 = 18 + 1 carry = 19 = 9 (carry 1)
0+9 = 9 + 1 carry = 10

10 9 9 8 9
109989

## Times 6 
So the times 6 rule is:

"Add 5 to the 'number' if it is odd. Add nothing to the 'number' if it is even. Then add that to half the neighbor. It really is a floor(half the neighbor)" 

For example 

847 x 6

7 + 5 (because "the number" or digit under consideration, 7, is odd) = 12 = 2 (carry 1)
4 + 0 (4 is even) + 3 (floor(7/2)) + 1 carry = 8 
8 + 0 (8 is even) + 2 (4/2) = 0 (Carry 1)
0 + 0 (0 is even) + 4 (8/2) + 1 carry = 5

So the answer is 5082

## Times 12 

"double the number and add the neighbor 

For example 

847 x 12 

7 * 2 + 0 = 14 = 4 (carry 1)
4 * 2 + 7 = 15 + 1 carry = 6 (carry 1)
8 * 2  + 4 = 20 + 1 carry = 1 (Carry 2)
0*2 + 8 = 8 + 2 carry = 0 (carry 1) -- we can just say 10 


Answer: 10 1 6 4  == 10164

Another example 

0841 x 12
----

1*2 + 0 = 2
4*2 + 1 = 9 
8*2 + 4 = 20 = 0 (carry 2)
0*2 + 8 + 2 carry = 10

10 0 9 2
10092

# Times 7 

"Double the number, add 5 to it if it is odd. Then add that all to half the neighbor" 

For example

0456 x 7
----

6*2 + 0 (6 is even) + 0/2 = 12 = 2 (carry 1)
5*2 + 5 (5 is odd) + 6/2 + 1 carry =  19 = 9 (Carry 1)
4*2 + 0 (4 is even) + 5/2 + 1 carry = 11 = 1 (Carry 1)
0*2 + 0 (0 is even) + 4/2 + 1 carry = 3

Answer = 3192
