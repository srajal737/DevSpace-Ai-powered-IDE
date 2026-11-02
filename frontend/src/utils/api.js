const BASEURL = import.meta.env.VITE_BACKEND_URL;

//SESSION 
export const SESSIONAPI = BASEURL+'/api/me';
//LOGIN
export const GOOGLELOGINAPI = BASEURL+"/api/auth/googlelogin";
export const LOGOUTAPI = BASEURL+"/api/auth/logout";

//PROJECT API:-


export const CREATEPROJECTAPI = BASEURL +"/api/project/createproject";
export const getAllProjectAPI = BASEURL+'/api/project/getallproject';
export const GETPROJECTBYIDAPI = BASEURL+'/api/project/getprojectbyid/:id';
export const GETSTARREDPROJECTAPI = BASEURL+'/api/project/getstarredproject';
export const TOGGLESTARAPI = BASEURL+'/api/project/togglestar/:id';
export const DELETEPROJECTAPI = BASEURL+'/api/project/deleteproject/:id';


//FILE API:-

export const CREATEROOTFOLDERAPI = BASEURL+'/api/project/createRoot';
export const CREATEFOLDERAPI = BASEURL+'/api/project/createFolder';
export const CREATEFILEAPI = BASEURL+'/api/project/createfile';
export const UPDATEFILEAPI = BASEURL+'/api/project/updatefile/:id';
export const GETFILE = BASEURL+'/api/project/getfile/:id';
export const GETFILETREE = BASEURL+'/api/project/getTree/:projectId';


//payment api:-

export const CREATEORDER = BASEURL+'/api/payment/createPayment' ;

export const ORDERVERIFY = BASEURL+'/api/payment/paymentVerify' ;

export const GETHISTORY = BASEURL+'/api/payment/history';

