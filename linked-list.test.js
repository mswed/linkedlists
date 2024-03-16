describe("push", function () {
    it("appends node and increments length", function () {
        let lst = new LinkedList();
        console.log(lst)

        lst.push(5);
        console.log(lst)
        expect(lst.length).toBe(1);
        expect(lst.head.val).toBe(5);
        expect(lst.tail.val).toBe(5);

        // lst.push(10);
        // expect(lst.length).toBe(2);
        // expect(lst.head.val).toBe(5);
        // expect(lst.head.next.val).toBe(10);
        // expect(lst.tail.val).toBe(10);
        //
        // lst.push(15);
        // expect(lst.length).toBe(3);
        // expect(lst.head.val).toBe(5);
        // expect(lst.head.next.next.val).toBe(15);
        // expect(lst.tail.val).toBe(15);
    });
});