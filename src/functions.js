import names from "./names.json";

export function buildListOfStudentsWithGender(originalList) {
  let finalList = [];
  originalList.forEach((student) => {
    let newStudent;
    const found = names.find(
      (item) => item.firstname.toLowerCase() === student.firstname.toLowerCase()
    );
    if (found) {
      newStudent = {
        ...student,
        gender: found.gender,
      };
    } else {
      newStudent = {
        ...student,
        gender: "3",
      };
    }
    finalList.push(newStudent);
  });
  return finalList;
}

function buildListOfSameGender(item, list) {
  if (!item || list.length === 0) return [];
  if (item.gender === "3")
    return list.filter((student) => student.url !== item.url);
  const resultList = list.filter(
    (student) => student.gender === item.gender && student.url !== item.url
  );
  return resultList;
}

export function findTwoRandomStudents(item, list) {
  const myList = buildListOfSameGender(item, list);
  // Copie du tableau pour ne pas le modifier
  const copyArr = [...myList];
  // Choix du premier élément
  const index1 = Math.floor(Math.random() * copyArr.length);
  const item1 = copyArr[index1];
  if (copyArr.length < 2) {
    return [item1];
  }
  // Retrait du premier élément choisi pour éviter de le choisir à nouveau
  copyArr.splice(index1, 1);
  // Choix du deuxième élément
  const index2 = Math.floor(Math.random() * copyArr.length);
  const item2 = copyArr[index2];
  return [item1, item2];
}

export function removeItemFromList(list, item) {
  const newList = list.filter((listItem) => listItem.url !== item.url);
  return newList;
}

export function extractNames() {
  let finalNames = [];
  names.forEach((name) => {
    const value = parseInt(name._max);
    if (value < 100) return;
    const newName = {
      firstname: name._val,
      gender: name._sexe,
    };
    finalNames.push(newName);
  });
  return finalNames;
}

function buildAMysteryCard(students) {
  const totalNumberOfStudents = students.length;
  const randomIndex = Math.floor(Math.random() * totalNumberOfStudents);
  const randomStudent = students[randomIndex];
  return card;
}

export function shuffleArray(arr) {
  const shuffledArr = [...arr];
  for (let i = shuffledArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArr[i], shuffledArr[j]] = [shuffledArr[j], shuffledArr[i]];
  }
  return shuffledArr;
}
