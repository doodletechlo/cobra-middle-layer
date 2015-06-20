function test(s) {
    return s +1;
}

describe('mydesc', function(){
    it('myit', function(){
        expect(test(2)).toEqual(4);
    });
});
