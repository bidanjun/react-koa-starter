import app from './server'

describe('server',()=>{
    it('can created',()=>{
        const server=app;
            
        expect(server).toBeTruthy();   
                     
    });
});