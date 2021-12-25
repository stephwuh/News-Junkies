

module.exports = {

    sourcesNeeded: function(biasNum, articleCount){

        //this array contains the rating number needed to balance the user bias number to 3

        let ratingNumArr = []; 



        // rounded biasNum *100 then divided by 100 to round biasNum to 2 decimal places
        // so while loop doesn't continue on for a long time. 

        while(Math.round(biasNum*100)/100 !== 3){

            //making sure ratingNumArr contains integers only

            let ratingNeeded = Math.round(3*(articleCount+1) - (biasNum*articleCount))

                



            if(ratingNeeded > 5) {

                

                if(ratingNeeded <=10 ){
                    ratingNumArr.push(5,4,3)
                    biasNum = ((biasNum*articleCount) + 5+4+3)/(articleCount+3)
                    articleCount +=3
                }else{

                    // if ratingNeeded is a high number, 
                    // we want users to focus more on the right leaning articles.

                    ratingNumArr.push(5,4)
                    biasNum = ((biasNum*articleCount) + 5+4)/(articleCount+2)
                    articleCount +=2
                }    

                // console.log('rating: ' + ratingNeeded)
                // console.log('bias: '+ biasNum)
                

            } else if (ratingNeeded < 0 ){


                if(ratingNeeded >= -10){

                    ratingNumArr.push(1,2,3)
                    biasNum = ((biasNum*articleCount) + 1+2+3)/(articleCount+3)
                    articleCount +=3

                }else{

                    // if ratingNeeded is a high negative number, 
                    // we want users to focus more on the left leaning articles.

                    ratingNumArr.push(1,2)
                    biasNum = ((biasNum*articleCount) + 1+2)/(articleCount+2)
                    articleCount +=2

                }

                // console.log('rating: ' + ratingNeeded)
                // console.log('bias: '+ biasNum)

            } else{

                //the newly calculated bias number could be 3, which means the user is balanced. 
                //that case the loop should end and the function should return

                if(ratingNeeded === 0) break;
                
                ratingNumArr.push(ratingNeeded)

                biasNum = ((biasNum*articleCount) + ratingNeeded)/(articleCount+1)

                articleCount ++

                // console.log('rating: ' + ratingNeeded)
                // console.log('bias: '+ biasNum)
            }

            

        }


        return ratingNumArr

    },


}

