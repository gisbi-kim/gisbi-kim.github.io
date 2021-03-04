
numStates = 4;
numMeasurements = 6;

A = rand(numMeasurements, numStates);

R = A;
Q_transpose = eye(numMeasurements);
for j=1:numStates

    v = housevec(R, j);
    H = housemat(v);

    Rj = H*R(j:end, j:end);
    R(j:end, j:end) = Rj;
    
    Qj = eye(numMeasurements);
    Qj(j:end, j:end) = H;
    Q_transpose = Qj * Q_transpose; 
    
    disp(j);
    disp(R);
end

Q = transpose(Q_transpose);

