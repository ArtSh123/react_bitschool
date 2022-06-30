// O - Open Close Principle


// class Square {
//     constructor(size) {
//         this.type = 'square',
//         this.size = size
//     }
// }

// class Circle {
//     constructor(radius) {
//         this.type = 'circle',
//         this.radius = radius
//     }
// }

// class Rectangle {
//     constructor(width, height) {
//         this.type = 'rectangle',
//         this.width = width,
//         this.height = height
//     }
// }

// class AreaCalc {
//     constructor(shapes = []) {
//         this.shapes = shapes
//     }

//     sum() {
//         return this.shapes.reduce((acc, shape) => {
//             if(shape.type === 'square') {
//                 acc += shape.size ** 2;
//             } else if(shape.type === 'circle') {
//                 acc += (shape.radius ** 2) * Math.PI;
//             } else if(shape.type === 'rectangle') {
//                 acc += shape.width * shape.height;
//             }
            
//             return acc;
//         }, 0)
//     }
// }

// const calc = new AreaCalc([
//     new Circle(5),
//     new Circle(3),
//     new Square(3),
//     new Rectangle(3, 4),
// ]);
// console.log(calc.sum());

class Shape {
    area() {
      throw new Error('Area method should be implemented')
    }
}

class Square extends Shape {
    constructor(size) {
        super()
        this.size = size
    }

    area() {
        return this.size ** 2
    }
}

class Circle extends Shape {
    constructor(radius) {
        super()
        this.radius = radius
    }

    area() {
        return (this.radius ** 2) * Math.PI
    }
}

class Rect extends Shape {
    constructor(width, height) {
        super()
        this.width = width
        this.height = height
    }

    area() {
        return this.width * this.height
    }
}

class Triangle extends Shape {
    constructor(a, b) {
        super()
        this.a = a
        this.b = b
    }

    area() {
        return (this.a * this.b) / 2
    }
}

class AreaCalculator {
    constructor(shapes = []) {
        this.shapes = shapes
    }

    sum() {
        return this.shapes.reduce((acc, shape) => {
            acc += shape.area()
            return acc
        }, 0)
    }
}


const calc = new AreaCalculator([
    new Square(10),
    new Circle(1),
    new Circle(5),
    new Rect(10, 20),
    new Triangle(10, 15)
])

console.log(calc.sum())