/*
display a list of all opened positions

funtions:
- sell() : update user info collected from the form to Firestore 
    - make changes to available balance based on the price from stockPrice()
    - remove trade info from user 
    - update trade history for user 
- stockPrice() : retrive real time stock market price for a given ticker 
*/