export const checkForWinner = (cells, winningCombos, user) => {
  const userIndexes = cells
    .map(cell => {
      if (cell.user === user) {
        return cell.id;
      }

      return null;
    })
    .filter(x => x);

  const isWinner = winningCombos.map(comb => {
    return comb
      .map(ini => userIndexes.includes(ini))
      .some(element => element === false);
  });

  return isWinner.includes(false);
};

export const updateCells = (cells, num, user) => {
  return cells.map(cell => {
    if (cell.id === num) {
      return { id: cell.id, user, status: "done" };
    }

    return cell;
  });
};

export const calculateFreeCells = (cells, compMoves, num) => {
  switch (compMoves) {
    case 0:
      return [cells[0], cells[2], cells[6], cells[8]].filter(
        cell => cell.status === "free"
      );

    case 1:
      return [cells[0], cells[2], cells[4], cells[6], cells[8]].filter(
        cell => cell.status === "free"
      );

    default:
      return cells.filter(cell => cell.status === "free");
  }
};

export const compStratergy = (cells, winningCombos, user, compUser) => {
  // first check winning combination are free
  // then if there are two for a specific user
  // then comp should move on that exact square

  const userCells = cells
    .map(cells => cells)
    .filter(cell => {
      if (cell.user === user) {
        return cell;
      }

      return null;
    })
    .map(cell => cell.id);

  const compCells = cells
    .map(cell => cell)
    .filter(cell => {
      if (cell.user === compUser) {
        return cell;
      }

      return null;
    })
    .map(cell => cell.id);

  // console.log("USER: ", userCells);
  // console.log("COMP: ", compCells);

  // loop through combos and return a user for each section

  const combos = winningCombos.map((combo, i) => {
    const combz = combo
      .map(comb => {
        if (userCells.includes(comb)) {
          return user;
        } else if (compCells.includes(comb)) {
          return compUser;
        }

        return null;
      })
      .filter(x => x);

    if (combz.length === 2 && combz[0] === combz[1]) {
      return { makemove: true, cells: winningCombos[i] };
    }

    return { makemove: false };
  });

  return combos.filter(combs => combs.makemove === true);

  // or convet user squares to their ids
};
