class ApiFeatures{
    constructor(query,querystr){   //querystr is the keyword that user add to find the particular prodcut
        this.query=query;
        this.querystr=querystr;
    }

    search(){
        const keyword=this.query.keyword ? {
            name:{
                $regex:this.querystr.keyword,
                $options:"i",   //this is for the case insensitive i can write small plus big letters
            },
        } :{};
        console.log(keyword);
        this.query=this.query.find({...keyword})
    }

}

module.exports=ApiFeatures;