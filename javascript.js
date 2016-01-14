function evalpostfix(post){
  var res=0;
  var stack=[];
  var index=0;
  for(index=0;index<post.length;index++){
     if(!isNaN(post[index])){ 
  	stack.push(post[index]);
     }
     else{
	var number2=parseFloat(stack.pop());
        var number1=parseFloat(stack.pop());
      
    	switch(post[index]){
    		  case '+': res=number1+number2;
    		            stack.push(res);
    		            break;
    		  case '-': res=number1-number2;
    		            stack.push(res);
    		            break;
    		  case '/': res=number1/number2;
                	    stack.push(res);
                            break;
 	          case '*': res=number1*number2;
             		    stack.push(res);
                   	    break;
       	}
     }
  }
  return stack[0];
} 

function priority(operator){

  switch(operator)
	{
		 case '+':
 		 case '-':  return 1;
 		 case '*':
 		 case '/':  return 2;
 		 default:  return -1;

    	}
}

function postfix(postarr){

 var index=0;
 var post_final=[];
 var stack=[];
 var item;
 for(index=0;index<postarr.length;index++){
	  if(postarr[index]=='('){ 
    		stack.push(postarr[index]);
    	  }
   	 else if(postarr[index]==')'){
      		var p;
      		p=stack.pop();
      		while(p!='('){
        		post_final.push(p);
        		p=stack.pop(); 
       		}
   	}
  	else if(!isNaN(postarr[index])){
     			post_final.push(postarr[index]);
   	}
  	else if(stack.length<1 || (priority(stack[stack.length-1])<priority(postarr[index]))){ 
       			stack.push(postarr[index]);
       	}
  	else{
	     while(stack[stack.length-1] !='(' && (priority(stack[stack.length-1])>=priority(postarr[index])) ){
		       post_final.push(stack.pop());
             }
     	stack.push(postarr[index]);
   	}  
 }
 while(stack.length>0){
  	item=stack.pop();
  	if(item!='('){
  		post_final.push(item);
        }
 }
 return post_final;
}

function eval(exp){

 var arr=exp.split("");
 var final_exp=[];
 var index=1;
 var i=0;
 final_exp[0]=arr[0];
 while(index<arr.length){
     if(!isNaN(arr[index]) && !isNaN(arr[index-1])){
     	     final_exp[i]=final_exp[i]+""+arr[index];
     } 
     else if(isNaN(arr[index])){
             if((arr[index]=='-' || arr[index]=='+') && arr[index-1]=='('){
            		i++; 
	                final_exp[i]=arr[index]+""+arr[index+1];
           		index++;
              }
             else if(arr[index]=='.'){
           		final_exp[i]=final_exp[i]+""+arr[index]+""+arr[index+1];
           		index++;
             }
             else{ 
             		i++;
             		final_exp[i]=arr[index];
             }
     }
     else if(!isNaN(arr[index] && isNaN(arr[index-1]))){
             if(index==1 && (arr[index-1]=='+'|| arr[index-1]=='-')){
       		        final_exp[i]=final_exp[i]+""+arr[index];
             }
             else{
            		i++;
            		final_exp[i]=arr[index];
                 }
     }
     
     index++;
 }
 var bal_not=(balance(final_exp) && cornercase(final_exp)); 
 if(bal_not==false){
	return "invalid syntax";
 }
  
 var post_array=postfix(final_exp);
 return evalpostfix(post_array);
}

function balance(value){

  var index=0;
  var stack=[];
  var count=0;
  for(index=0;index<value.length;index++){
      if(value[index]=='('){
   	    count++; 
      }
     else if(value[index]==')'){
    	    count--;
      }  
  }
  if(count!=0){
     return false;  
  }
  return true;
}

function values(data){            //to enter text in text fields
 document.getElementById("txt").value+=data;
}

function cleartext(){             //to clear text field
 document.getElementById("txt").value="";
}

function backspace(){
 var value=document.getElementById("txt").value;
 document.getElementById("txt").value = value.substr(0, value.length - 1);
}

function check(){

 var value=document.getElementById("txt").value;
 var lastletter=value.charAt(value.length-1);
 if((lastletter>='0' && lastletter<='9')||lastletter=='('||lastletter==')'||lastletter=='+'||lastletter=='-'||lastletter=='*'||      lastletter=='/'||lastletter=='.'){
    document.getElementById("txt").value = value;
 }
 else{
    document.getElementById("txt").value = value.substr(0, value.length - 1); 
 }
} 

function opornot(operator){
   switch(operator){
      case '+':
      case '-':
      case '*':
      case '/': return true;
      default : return false;

   }
}

function cornercase(expr){
 var index=0;
 if(opornot(expr[expr.length-1]) || expr[0]==')'|| expr[0]=='*'|| expr[0]=='/'){
	   return false;
 }
 for(index=1;index<expr.length;index++){
	   if(opornot(expr[index]) && opornot(expr[index-1])){
	       return false;
           }
   	   else if(expr[index]==')' && opornot(expr[index-1])){
      	       return false;
           }
           /*else if(expr[index-1]==')' && opornot(expr[index]))
               return false;*/
 }
 return true;
}

function result(){
 r=eval(document.getElementById("txt").value);
 document.getElementById("txt").value=r;
}




