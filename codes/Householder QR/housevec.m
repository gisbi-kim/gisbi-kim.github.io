function [u] = housevec(A, j)

x = A(j:end, j);

u = zeros(size(x));
u(1) = sign(x(1))*norm(x);
u = u + x;

u = u / norm(u);

end

