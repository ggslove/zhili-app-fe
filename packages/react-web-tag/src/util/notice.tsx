export const checkError=({error,response}: any)=>{
  //判断是否有异常
  if(error){
    return error;
  }else{
    if(response.error){
      //reponse 错误
      if(response.status>=500){
        return {message:response.text};
      }
      return JSON.parse(response.text);
    }
  }
  return null;
};

// export const api = (() => {
//   const apiHttp = createClient('/api', { withCredentials: true });
//   apiHttp.addHeader('If-Modified-Since', '');
//   apiHttp.interceptors.response.use(
//     response => response,
//     error => {
//       if (error.response) {
//         let message = checkError(error.response);
//         if (!message) {
//           message = error.response.data;
//         }
//         doError(message);
//       }
//     },
//   );
//   return apiHttp;
// })();
