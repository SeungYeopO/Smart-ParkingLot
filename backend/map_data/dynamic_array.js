// 동적 배열 클래스 구현
class DynamicArray {
    constructor() {
      this.array = [];
    }
  
    // 요소 추가
    push(element) {
      this.array.push(element);
    }
  
    // 특정 위치의 요소 제거
    removeAt(index) {
      if (index >= 0 && index < this.array.length) {
        this.array.splice(index, 1);
      }
    }
  
    // 특정 위치의 요소 얻기
    get(index) {
      if (index >= 0 && index < this.array.length) {
        return this.array[index];
      }
      return undefined;
    }
  
    // 배열의 크기 얻기
    size() {
      return this.array.length;
    }
  
    // 배열 출력
    print() {
      console.log(this.array);
    }
  }

  module.exports(DynamicArray);
  