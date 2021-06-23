import {construct, variant, VariantOf, variation} from '.';

test('variant w/ classes', () => {
    // Defined ahead of time to have in scope for instanceOf check.
    const Dog = class {
        constructor(
            private barkVolume: number
        ) { }

        public bark() {
            // can access class members.
            const msg = this.barkVolume > 5 ? 'BARK' : 'bark';
            console.log(msg);
        }
    }

    // I'm honestly not sure if this will work.
    const ClassyAnimal = variant({
        dog: construct(Dog),
        cat: construct(class {
            public furnitureDamaged = 0;
        }),
        snake: construct(class {
            constructor(
                private color: string,
                private isStriped: boolean = false,
            ) { }

            get skin() {
                return `${this.isStriped && 'striped '}${this.color}`;
            }
        })
    });
    type ClassyAnimal = VariantOf<typeof ClassyAnimal>;


    const dog = ClassyAnimal.dog(4);

    expect(dog instanceof Dog).toBe(true);
})


test('variant list w/ classes', () => {
    const thing2 = variant([
        variation('Dog', construct(class {

        })),
    ])
})