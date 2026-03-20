function aplicarM(M, p) {
 let x = M[0][0]*p.x + M[0][1]*p.y + M[0][2];
 let y = M[1][0]*p.x + M[1][1]*p.y + M[1][2];
 return {x, y};
}