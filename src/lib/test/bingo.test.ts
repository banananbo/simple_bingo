import {Bingo} from '../bingo/Bingo'

test('Bingo createNew is work', () => {
  let bingo:Bingo = Bingo.createNew(3);
  expect(bingo.cells.length).toBe(3*3);
});