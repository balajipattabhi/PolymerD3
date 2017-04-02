var getData = function(file, callback){

  var extn = file.split(".");
  switch(extn[1])
  {
  case 'csv': {
      d3.csv(file, function(error, data){
          callback(error, data)
      });
      break;
    }

  case 'json': {
      d3.json(file, function(error, data){
          callback(error, data)
      });
      break;
    }

  case 'tsv': {
      d3.tsv(file, function(error, data){
          callback(error, data)
      });
      break;
    }
  }
  
}
