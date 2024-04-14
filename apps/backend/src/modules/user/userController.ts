import { Request, Response } from 'express';
import { handleServiceResponse } from '@common/utils/responseHandler';
import { IUserService } from '@modules/user/userService';
import { signJwt } from '@common/utils/jwt.util';
import { IVerificationService } from '@modules/verification/verificationService';

export class UserController {
  private readonly _service: IUserService;
  private readonly _verificationService: IVerificationService;

  constructor(service: IUserService, verificationService: IVerificationService) {
    this._service = service;
    this._verificationService = verificationService;
  }

  getAllUsers = async (_: Request, res: Response) => {
    const serviceResponse = await this._service.findAll();
    handleServiceResponse(serviceResponse, res);
  };

  getUserById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const serviceResponse = await this._service.findById(id!);
    handleServiceResponse(serviceResponse, res);
  };

  register = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(401).json({ error: 'Email/Password are required' });
    }
    const result = await this._service.register({ email, password });
    const jwtToken = signJwt({ id: result.responseObject });
    res.cookie('attendance', jwtToken, { maxAge: 86400, httpOnly: true, secure: true });
    return handleServiceResponse(result, res);
  };
  login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(401).json({ error: 'Email/Password are required' });
    }
    const result = await this._service.login({ email, password });
    const jwtToken = signJwt({ id: result.responseObject?.id });
    res.cookie('attendance', jwtToken, { maxAge: 86400, httpOnly: true, secure: true });
    return handleServiceResponse(result, res);
  };

  logout = async (_: Request, res: Response) => {
    res.clearCookie('attendance');

    return res.send('successfully logged out');
  };

  verify = async (req: Request, res: Response) => {
    const { token, id } = req.body;
    const serviceResponse = await this._verificationService.verifyToken({ token: token, userId: id });
    const jwtToken = signJwt({ id });
    res.cookie('attendance', jwtToken, { maxAge: 86400, httpOnly: true, secure: true });
    handleServiceResponse(serviceResponse, res);
  };

  onBoard = async (req: Request, res: Response) => {
    const id = req.user;
    const { avatar, title, intro, qualifications, firstName, lastName } = req.body;
    const result = await this._service.onBoard({
      avatar,
      title,
      intro,
      firstName,
      lastName,
      qualifications: qualifications.split(' '),
      id: String(id),
    });
    handleServiceResponse(result, res);
  };
}
