import sayHi from '../src/index'

describe('Test saying hi', () => {
    it( 'Has default value of Roy', () => {
        expect(sayHi()).toEqual('Hi Roy');
    });

      it( 'Who argument works', () => {
          expect(sayHi('Mike')).toEqual('Hi Mike');
      });

});