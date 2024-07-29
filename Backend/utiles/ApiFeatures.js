class ApiFeatures {
    constructor(query, querystr) {
        this.query = query;
        this.querystr = querystr;
    }

    search() {
        const keyword = this.querystr.keyword ? {
            name: {
                $regex: this.querystr.keyword,
                $options: "i" // case insensitive
            }
        } : {};
        
        // console.log("Keyword:", keyword); // Debugging log
        this.query = this.query.find({ ...keyword });
        return this;
    };

    filter(){
        const querycopy={...this.querystr}  //if we write only this.querystr then it changes the object beacuase it is passing by reference
        //  console.log(querycopy)
        // Removing some fields for the category
        const removeFields=["keyword","page","limit"];        
        removeFields.forEach(key =>delete querycopy[key]);


        //Filter for price and rating

        let querystr = JSON.stringify(querycopy);
        querystr = querystr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);

        this.query = this.query.find(JSON.parse(querystr));   // convert to the object again

        return this;
        }

        pagination(resultPerPage) {
            const currentPage = Number(this.querystr.page) || 1;
        
            const skip = resultPerPage * (currentPage - 1);
        
            this.query = this.query.limit(resultPerPage).skip(skip);  //mongodb functions
        
            return this;
          }
}

module.exports = ApiFeatures;
