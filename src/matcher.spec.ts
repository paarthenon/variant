import {just} from './match.tools';
import {matcher} from './matcher';
import {Animal, sample} from './__test__/animal';

test('matcher', () => {
    const rating = (anim: Animal) => {
        const answer = matcher(anim)
            .when(['cat', 'dog'], c => c.name)
            .when({
                snake: just(4),
            })
            .complete();
        return answer;
    }

    const greetAnimal = (animal: Animal) => matcher(animal)
        .when({
            snake: just('You offer your snake a new rat.'),
        })
        .when(['cat', 'dog'], e => e)
        .complete();

    const asdf = greetAnimal(sample.cerberus);
    expect(rating(Animal.snake('steve'))).toBe(4);
    expect(rating(sample.cerberus)).toBe(sample.cerberus.name);
})

test('matcher else', () => {
    const rating = (anim: Animal) => {
        const answer = matcher(anim)
            .when(['cat', 'dog'], c => c.name)
            .else(just(4))
        ;
        return answer;
    }

    expect(rating(Animal.snake('steve'))).toBe(4);
    expect(rating(sample.cerberus)).toBe(sample.cerberus.name);
})
