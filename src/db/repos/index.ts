import RentsRepo from './rentsRepo';

// Database Interface Extensions:
interface IExtensions {
    rents: RentsRepo
}

export {
    IExtensions,
    RentsRepo
};
