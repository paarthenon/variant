import {variantList, variant, fields, TypeNames, VariantOf} from '..';
import {OutVariant, RawVariant, Variant, VariantCreator, variantModule} from '../variant';
export const Animal = variantList([
    variant('dog', fields<{name: string, favoriteBall?: string}>()),
    variant('cat', fields<{name: string, daysSinceDamage: number}>()),
    variant('snake', (name: string, patternName?: string) => ({
        name,
        pattern: patternName ?? 'striped',
    })),
]);
export type Animal<T extends TypeNames<typeof Animal> = undefined> = VariantOf<typeof Animal, T>;

export const Animal2 = variantModule({
    dog: fields<{name: string, favoriteBall?: string}>(),
    cat: fields<{name: string, daysSinceDamage: number}>(),
    snake: (name: string, pattern = 'striped') => ({name, pattern}),
    bird: undefined,
});
export type Animal2<T extends TypeNames<typeof Animal2> = undefined> = VariantOf<typeof Animal2, T>;

export const cerberus = Animal.dog({name: 'Cerberus'});
export const cerberus2 = Animal2.dog({name: 'Cerberus'});

type z = Animal;


export const AmphibiousAnimal = variantList([
    variant('frog', fields<{color: string}>()),
]);
export type AmphibiousAnimal<T extends TypeNames<typeof AmphibiousAnimal> = undefined> = VariantOf<typeof AmphibiousAnimal, T>;

export const WaterAnimal = variantList([
    variant('goldfish', fields<{memoryInSeconds: number}>()),
]);
export type WaterAnimal<T extends TypeNames<typeof WaterAnimal> = undefined> = VariantOf<typeof WaterAnimal, T>;


// type LambdaExpr =
//     | Variant<'Var', {ident: string}>
//     | Variant<'Apply', {func: LambdaExpr, arg: LambdaExpr}>
//     | Variant<'Lambda', {argName: string, body: LambdaExpr}>
// ;

// const LambdaExpr = constrainedVariant<LambdaExpr>()({
//     Var(ident: string) {
//         return {ident}
//     },
//     Apply: fields<Omit<FromVariant<LambdaExpr, 'Apply'>, 'type'>>(),
//     Lambda: fields<{argName: string, body: LambdaExpr}>(),
// });

// const LambdaExpr2 = exactVariant<
//     | Variant<'Var', {ident: string}>
//     | Variant<'Apply', {func: LambdaExpr, arg: LambdaExpr}>
//     | Variant<'Lambda', {argName: string, body: LambdaExpr}>
// >({
//     Apply: pass,
//     Lambda: pass,
//     Var: pass,
// });

// const ajakaa = LambdaExpr2.Lambda({argName: 'aha', body: LambdaExpr2.Var({ident: 'yo'})})
